import React from 'react'

export default function ImageBlock({ block }) {
  const { props = {} } = block
  return (
    <div>
      <img src={props.src} alt={props.alt || ''} className="max-w-full rounded" />
      {props.caption && <div className="text-sm text-gray-600 mt-2">{props.caption}</div>}
    </div>
  )
}