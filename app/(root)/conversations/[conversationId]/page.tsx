import ChatInput from "./_components/input/ChatInput";
import Body from "./_components/body/Body";
import Header from "./_components/Header";
import ConversationContainer from "@/features/conversation/components/conversation-container";

interface Params {
  params: {
    conversationId: string;
  };
}

const ParticularConversation = ({ params }: Params) => {
  console.log(params.conversationId);
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
