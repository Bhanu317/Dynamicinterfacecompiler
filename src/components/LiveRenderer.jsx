import React from 'react'
import FormBlock from './blocks/FormBlock'
import TextBlock from './blocks/TextBlock'
import ImageBlock from './blocks/ImageBlock'

const blockMap = {
  form: FormBlock,
  text: TextBlock,
  image: ImageBlock
}

export default function LiveRenderer({ schema, onSchemaChange }) {
  if (!schema || !Array.isArray(schema.blocks)) return <div>No blocks defined</div>

  return (
    <div className="space-y-4">
      {schema.blocks.map((blk) => {
        const C = blockMap[blk.type]
        if (!C) return <div key={blk.id}>Unknown block type: {blk.type}</div>
        return (
          <div key={blk.id} className="p-3 border rounded">
            <C block={blk} onSchemaChange={onSchemaChange} />
          </div>
        )
      })}
    </div>
  )
}