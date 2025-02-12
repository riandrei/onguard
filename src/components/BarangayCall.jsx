import { useEffect, useState } from "react";
import {
  CallingState,
  StreamCall,
  StreamVideo,
  StreamTheme,
  StreamVideoClient,
  useCall,
  useCallStateHooks,
  ParticipantView,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";

const apiKey = "7g9rezccke4j";
const userId = "barangay";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmFyYW5nYXkifQ.kBkv8dMbEW2RZmAXZuVNMIbKQbRostaI4Qu_bUo1MXg";

const BarangayCall = ({ callId }) => {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);

  useEffect(() => {
    const user = {
      id: userId,
      name: "barangay",
      image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
    };

    const client = new StreamVideoClient({ apiKey, user, token });
    setClient(client);

    const call = client.call("default", callId);
    setCall(call);

    call.join({ create: true });

    // Listen for call end
    const handleCallEnd = () => {
      console.log("Call ended. Leaving...");
      call.leave();
      setCall(null); // Remove call instance
    };

    call.on("call.ended", handleCallEnd);

    // Cleanup on unmount
    return () => {
      call.off("call.ended", handleCallEnd);
      call.leave(); // Leave call
      client.disconnectUser(); // Disconnect client
      setClient(null);
    };
  }, [callId]);

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
};

const MyUILayout = () => {
  const call = useCall();

  const {
    useCallCallingState,
    useLocalParticipant,
    useRemoteParticipants,
    // ... other hooks
  } = useCallStateHooks();

  const callingState = useCallCallingState();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <MyParticipantList participants={remoteParticipants} />
      <MyFloatingLocalParticipant participant={localParticipant} />
    </StreamTheme>
  );
};

const MyParticipantList = ({ participants }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
      {participants.map((participant) => (
        <ParticipantView
          participant={participant}
          key={participant.sessionId}
        />
      ))}
    </div>
  );
};

const MyFloatingLocalParticipant = ({ participant }) => {
  return (
    <div
      style={{
        width: "240px",
        height: "135px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 3px",
        borderRadius: "12px",
      }}
    >
      <ParticipantView participant={participant} />
    </div>
  );
};

export default BarangayCall;
