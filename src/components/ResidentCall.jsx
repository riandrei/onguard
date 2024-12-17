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
const userId = "resident";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicmVzaWRlbnQifQ.-77_UGXGObvcP0A_NLnlzQSEeqAv9ypZj3Ecz2Uxybc";

// Set up the user object

function ResidentCall({ callId }) {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);

  useEffect(() => {
    const user = {
      id: userId,
      name: "resident",
      image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
    };

    const client = new StreamVideoClient({ apiKey, user, token });
    setClient(client);
    const call = client.call("default", callId);
    setCall(call);
    call.join({ create: true });
  }, []);
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

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

export default ResidentCall;
