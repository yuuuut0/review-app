import React, { useEffect } from 'react'

export default function Sample() {

  useEffect(() => {
    console.log('Component mouted');
    return () => {
      console.log('Component unmounted');
    }
  }, []);

  return (
    <div>Sample</div>
  )
}
