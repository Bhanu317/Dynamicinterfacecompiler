import React, { useEffect, useState } from 'react'
import SchemaEditor from './components/SchemaEditor'
import LiveRenderer from './components/LiveRenderer'

const DEFAULT_SCHEMA = {
  blocks: [
    {
      id: 'hdr1',
      type: 'text',
      props: { text: 'Welcome — Dynamic Interface Compiler' }
    },
    {
      id: 'form1',
      type: 'form',
      props: {
        fields: [
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'age', label: 'Age', type: 'number', min: 18 }
        ],
        submitText: 'Register'
      },
      onSubmit: "if (values.age && Number(values.age) < 21) return { _error: 'Too young' }; return { _ok: true }"
    },
    {
      id: 'img1',
      type: 'image',
      props: {
        src: "https://plus.unsplash.com/premium_photo-1750096309005-d8217018c1fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D",
        alt: 'A cat'
      }
    }
  ]
}

export default function App() {
  const [schema, setSchema] = useState(() => {
    try {
      const raw = localStorage.getItem('dic:schema')
      return raw ? JSON.parse(raw) : DEFAULT_SCHEMA
    } catch (e) {
      return DEFAULT_SCHEMA
    }
  })

  useEffect(() => {
    localStorage.setItem('dic:schema', JSON.stringify(schema))
  }, [schema])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-black my-16px p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-5 bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-3">UI Block Definition</h2>
          <SchemaEditor value={schema} onChange={setSchema} />
        </div>
        <div className="col-span-7 bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-3">Live Renderer</h2>
          <LiveRenderer schema={schema} onSchemaChange={setSchema} />
        </div>
      </div>
    </div>
  )
}
;