"use client";

import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";
import { Mic, MicOff } from "lucide-react";

enum CallStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  CONNECTING = "CONNECTING",
  FINISHED = "FINISHED",
}

const CompanionComponent = ({
  subject,
  name,
  topic,
  voice,
  style,
  userName,
  userImage,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const handleConnect = async () => {
    setCallStatus(CallStatus.CONNECTING);

    const assistantOverrides = {
      variableValues: {
        subject,
        topic,
        style,
      },
      clientMessages: ["transcript"],
      serverMessages: [],
    };
    // @ts-expect-error //asa
    await vapi.start(configureAssistant(voice, style), assistantOverrides);
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) lottieRef.current?.play();
      else lottieRef.current?.stop();
    }
  }, [isSpeaking, lottieRef]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => {
      console.log("ERROR", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, []);
  return (
    <section className="flex h-[70vh] flex-col">
      <section className="flex gap-8 max-sm:flex-col">
        <div className="companion-section">
          <div
            className="companion-avatar"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.FINISHED ||
                  callStatus === CallStatus.INACTIVE
                  ? "opacity-100"
                  : "opacity-0",
                CallStatus.CONNECTING === callStatus &&
                  "animate-pulse opacity-100",
              )}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt={subject}
                width={150}
                height={150}
                className="max-sm:w-fit"
              />
            </div>

            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0",
              )}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoPlay={false}
                className="companion-lottie"
              />
            </div>
          </div>

          <p className="text-2xl font-bold">{name}</p>
        </div>

        <div className="user-section">
          <div className="user-avatar">
            <Image
              src={userImage}
              alt={userName}
              width={130}
              height={130}
              className="rounded-full"
            />
            <p className="text-2xl font-bold">{userName}</p>
          </div>
          <button
            disabled={callStatus !== CallStatus.ACTIVE}
            onClick={toggleMicrophone}
            className="btn-mic disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isMuted ? <MicOff size={36} /> : <Mic size={36} />}
            <p className="max-sm:hidden">{isMuted ? "Unmute" : "Mute"}</p>
          </button>

          <button
            className={cn(
              "w-full cursor-pointer rounded-lg py-2 text-white transition-colors",
              callStatus === CallStatus.ACTIVE ? "bg-red-700" : "bg-primary",
              callStatus === CallStatus.CONNECTING && "animate-pulse",
            )}
            onClick={
              callStatus === CallStatus.ACTIVE
                ? handleDisconnect
                : handleConnect
            }
          >
            {callStatus === CallStatus.ACTIVE
              ? "End Call"
              : callStatus === CallStatus.CONNECTING
                ? "Connecting..."
                : "Start Call"}
          </button>
        </div>
      </section>

      <section className="transcript">
        <div className="transcript-message no-scrollbar">
          {messages.map((message, index) => {
            if (message.role === "assistant") {
              return (
                <p key={index} className="max-sm:text-sm">
                  {name.split(" ")[0]?.replace("/[,.]/g", "")}:{" "}
                  {message.content}
                </p>
              );
            }
            if (message.role === "user") {
              return (
                <p key={index} className="text-primary max-sm:text-sm">
                  {userName}: {message.content}
                </p>
              );
            }
          })}
        </div>

        <div className="transcript-fade" />
      </section>
    </section>
  );
};

export default CompanionComponent;
