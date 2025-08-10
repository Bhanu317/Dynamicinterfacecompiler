import React from 'react'

export default function TextBlock({ block }) {
  const { props = {} } = block
  return (
    <div>
      <h3 className="text-lg font-semibold">{props.title || 'Text'}</h3>
      <div className="mt-2">{props.text}</div>
    </div>
  )
}