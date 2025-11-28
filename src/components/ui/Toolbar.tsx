// src/Toolbar.tsx
import { Button } from '@/components/tiptap-ui-primitive/button'
import { BoldIcon } from '@/components/tiptap-icons/bold-icon'
import { ItalicIcon } from '@/components/tiptap-icons/italic-icon'
import { Toolbar, ToolbarGroup, ToolbarSeparator } from '@/components/tiptap-ui-primitive/toolbar'
import { Spacer } from '@/components/tiptap-ui-primitive/spacer'
import type { Editor } from '@tiptap/react'

type ToolbarProps = {
  editor: Editor | null
}

export default function MyToolbar({ editor }: ToolbarProps) {
  if (!editor) return null

  return (
    <Toolbar variant="fixed">
      {/* 글자 스타일 그룹 */}
      <ToolbarGroup>
        <Button
          data-style="ghost"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'active' : ''}
        >
          <BoldIcon className="tiptap-button-icon" />
        </Button>
        <Button
          data-style="ghost"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'active' : ''}
        >
          <ItalicIcon className="tiptap-button-icon" />
        </Button>
      </ToolbarGroup>

      <ToolbarSeparator />

      {/* 제목 그룹 */}
      <ToolbarGroup>
        <Button
          data-style="ghost"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'active' : ''}
        >
          H1
        </Button>
        <Button
          data-style="ghost"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}
        >
          H2
        </Button>
        <Button
          data-style="ghost"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'active' : ''}
        >
          H3
        </Button>
      </ToolbarGroup>

      <Spacer />

      {/* Save 버튼 */}
      
    </Toolbar>
  )
}
