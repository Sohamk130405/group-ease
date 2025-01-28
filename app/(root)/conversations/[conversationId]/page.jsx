import ConversationContainer from "@/components/conversation/ConversationContainer";
import ChatInput from "./_components/input/ChatInput";
import Body from "./_components/body/Body";
import Header from "./_components/Header";

const ParticularConversation = ({ params: { conversationsId } }) => {
  return (
    <ConversationContainer>
      <Header
        imageUrl={
          "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
        }
        name={"John Doe"}
      />{" "}
      <Body />
      <ChatInput />
    </ConversationContainer>
  );
};

export default ParticularConversation;
