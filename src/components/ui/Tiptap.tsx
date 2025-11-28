// src/Tiptap.tsx
import { EditorContent,Editor  } from '@tiptap/react'
// Toolbar 컴포넌트 가져오기
import Toolbar from './Toolbar' 
import React from 'react';
interface TiptapProps{
  editor: Editor | null
}
const Tiptap:React.FC<TiptapProps> = ({editor}) => {
  

  return (
    <div className='email_add_body'>
      <Toolbar editor={editor} /> 
      <EditorContent editor={editor} /> 
    </div>
  )
}

export default Tiptap
