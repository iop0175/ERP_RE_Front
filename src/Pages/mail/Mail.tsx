import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useEditor } from "@tiptap/react";
import StarterKit from '@tiptap/starter-kit';
import Tiptap from "@/components/ui/Tiptap";
import { formatDate } from "@/components/date/FormatDate";
import { getMailByUserId, postMailAdd } from "@/service/mail/Mail";
import Plus from "@/styles/SVG/Plus";
import "@/styles/css/pages/mail/mail.css";
import { getAllUsers } from "@/service/users/User";
import DOMPurify from 'dompurify';
import PageLoading from "../modals/PageLoading";
import Cross from "@/styles/SVG/Cross";
interface Maildata {
  mailId: number;
  subject: string;
  body: string;
  sendAt: string;
  sender: Sender;
  receivers : Receivers[];
  senderId:string;
};
interface Sender{
  userName:string
}
interface Receivers{
  user:User;
}
interface Dept {
  deptName: string;
};
interface User {
  userId: number;
  class: number;
  email: string;
  userName: string;
  dept: Dept[];
};

interface receiverEmail {
  email: string;
};

const Mail = () => {
  const location = useLocation();

  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading,setLoading] = useState(false);
  const [userList, setUserList] = useState<User[]>([]);
  const [mails, setMails] = useState<Maildata[]>([]);
  const [selectedMailId, setSelectedMailId] = useState<number | null>(null);
  const [createMail, setCreateMail] = useState(false);
  const [title, setTitle] = useState("");
  const [receiverEmail, setReceiverEmail] = useState<receiverEmail[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const selectedMail = mails.find(mail => mail.mailId === selectedMailId);
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World!</p>',
  });

  useEffect(() => {
    if (location.state && location.state.m) {
      setSelectedMailId(location.state.m.mailId);
    }
  }, [location.state]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const userList = await getAllUsers();
        setUserList(userList);
        const list = await getMailByUserId(user.userId);
        setMails(list);
      } catch (err) {
        console.error(err);
      }finally{
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const send = () => {
    const payload = {
      subject: title,
      body: editor.getHTML(),
      senderId: user.userId,
      Emails: receiverEmail
    }
    postMailAdd(payload);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value === "") {
      setFilteredUsers([]);
      return;
    }
    const filtered = userList.filter((user) =>
      user.email.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };
  const selectedReEmail = (email: string) => {
    setReceiverEmail(prev => {
      if (prev.some(e => e.email === email)) return prev;

      return [...prev, { email }];
    });
    setInputValue("");
    setFilteredUsers([]);
  };
  const deleteReciver=(index:number)=>{
     setReceiverEmail(prev => prev.filter((_, i) => i !== index));
  }
  return (
    <div className="mail_content">
      <div className="mail_list_container">
        {mails.map(mail => (
          <div
            className="mail_list"
            key={mail.mailId}
            onClick={() => setSelectedMailId(mail.mailId)}
          >
            <div>{mail.sender.userName}</div>
            <div>
              <div>{mail.subject}</div>
              <div>{formatDate(new Date(mail.sendAt))}</div>
            </div>
            <div className="mail_preview">
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(mail.body) }} />
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
                <div>From: <strong>{selectedMail.sender.userName}</strong></div>
                <div style={{display:"flex"}}>To: <strong style={{display:"flex"}}>{selectedMail.receivers.map((user)=>(
                    <div style={{marginRight:"5%"}} key={user.user.userId}>{user.user.email}({user.user.userName})</div>
                ))}</strong></div>
                <div>{formatDate(new Date(selectedMail.sendAt))}</div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedMail.body) }} />
            </div>
          )}
        </div>
      ) : (
        <div className="mail_add_page">
          <div className="mail_add_buttons">
            <button onClick={send}>Send</button>
            <button onClick={() => setCreateMail(false)}>Cancel</button>
          </div>
          <div className="mail_add_page_input">
            <div>Title</div>
            <input type="text" placeholder="title" onChange={(e) => { setTitle(e.target.value) }} />
          </div>
          <div className="mail_add_page_input">
            <div className="Receivers">
              {receiverEmail.map((mails,index) => (
                <div className="ReceiversList" key={mails.email}>{mails.email}<div onClick={()=>deleteReciver(index)}><Cross/></div></div>
              ))}
            </div>
            <div>Receiver</div>
            <input type="text" placeholder="receiver" value={inputValue} onChange={handleInputChange} style={ filteredUsers.length > 0 ? { borderRadius: "0.5vw 0.5vw 0 0" } : {borderRadius:"0.5vw"} } />
            <div></div>
            <div>
              {filteredUsers.map((user) => (
                <div key={user.userId} className="mail_filterUser" onClick={() => selectedReEmail(user.email)}>{user.email}:{user.userName}</div>
              ))}
            </div>
          </div>
          <div className="mail_Tiptap">
            {editor && <Tiptap editor={editor} />}
          </div>
        </div>
      )}
      {loading && <PageLoading/>}
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
