import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useEditor } from "@tiptap/react";
import StarterKit from '@tiptap/starter-kit';
import Tiptap from "@/components/ui/Tiptap";
import { formatDate } from "@/components/date/FormatDate";
import { getMailByUserId } from "@/service/mail/Mail";
import Plus from "@/styles/SVG/Plus";
import "@/styles/css/pages/mail.css";

interface Mail {
  mailId: number;
  subject: string;
  body: string;
  sendAt: string;
  senderId: number;
  senderName: string;
  receiverId: number;
  receiverName: string;
}

const Mail = () => {
  const location = useLocation();
  
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  
  const [mails, setMails] = useState<Mail[]>([]);
  const [selectedMailId, setSelectedMailId] = useState<number | null>(null);
  const [createMail, setCreateMail] = useState(false);

  const selectedMail = mails.find(mail => mail.mailId === selectedMailId);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World!</p>',
  });

  // location.state에서 선택된 메일 초기화
  useEffect(() => {
    if (location.state && location.state.m) {
      setSelectedMailId(location.state.m.mailId);
    }
  }, [location.state]);

  // 메일 목록 불러오기
  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const list = await getMailByUserId(user.userId);
        setMails(list);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [user]);

  const send = () => {
    if (editor) {
      console.log(editor.getHTML());
    }
  };

  return (
    <div className="mail_content">
      <div className="mail_list_container">
        {mails.map(mail => (
          <div
            className="mail_list"
            key={mail.mailId}
            onClick={() => setSelectedMailId(mail.mailId)}
          >
            <div>{mail.senderId}</div>
            <div>
              <div>{mail.subject}</div>
              <div>{formatDate(new Date(mail.sendAt))}</div>
            </div>
            <div className="mail_preview">
              {mail.body}
            </div>
          </div>
        ))}
      </div>

      {!createMail ? (
        <div className="mail_detail">
          {selectedMail && (
            <div className="mail_selected">
              <div>{selectedMail.subject}</div>
              <div>
                <div>From: <strong>{selectedMail.senderName}</strong></div>
                <div>To: <strong>{selectedMail.receiverName}</strong></div>
                <div>{formatDate(new Date(selectedMail.sendAt))}</div>
              </div>
              <div>{selectedMail.body}</div>
            </div>
          )}
        </div>
      ) : (
        <div className="mail_add_page">
          <div className="mail_add_page_input">
            <div>Title</div>
            <input type="text" placeholder="title" />
          </div>
          <div className="mail_add_page_input">
            <div>Receiver</div>
            <input type="text" placeholder="receiver" />
          </div>
          {editor && <Tiptap editor={editor} />}
          <div className="mail_add_buttons">
            <button onClick={send}>Send</button>
            <button onClick={() => setCreateMail(false)}>Cancel</button>
          </div>
        </div>
      )}

      {!createMail && (
        <div className="mail_add" onClick={() => setCreateMail(true)}>
          <div className="mail_add_text">Create Mail</div>
          <Plus />
        </div>
      )}
    </div>
  );
};

export default Mail;
