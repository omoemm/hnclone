import React from 'react'

const dateStyle = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
}

export default function ShortDate({ time }) {
  const date = new Date(time * 1e3)
  return <>{date.toLocaleString([], dateStyle)}</>
}
