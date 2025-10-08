import { Button, QRCode } from "antd";
import { Download } from "lucide-react";
import React, { useRef } from "react";
import '@ant-design/v5-patch-for-react-19';


const App = () => {
  const divRef = useRef(null)
  const downloadNow = ()=>{
   const div = divRef.current
   const canvas = div.querySelector("canvas")
   const base64String = canvas.toDataURL("image/png")
   const a = document.createElement("a")
   a.href = base64String
   a.download = "qr-code"
   a.click()
   a.remove()
  }

  return(
    <div className="bg-gray-100 h-screen py-12 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-16">QR Code Generator</h1>
      <div ref={divRef} className="mb-12 rounded-xl p-4 bg-white shadow-lg w-fit hover:scale-115 transition-transform duration-300 hover:shadow-2xl">
       <QRCode value="https://www.youtube.com/"
       size = {300}
       icon="https://api.dicebear.com/7.x/adventurer/svg?seed=tFvXxODI1AzZ03ymPwBhJ"
       bgColor="black"
       color="white"
       />
      </div>
      <div>
        <Button size="large" 
        type="primary" 
        className="!bg-gradient-to-br !from-violet-600 !via-blue-500 !to-indigo-600 "
        icon={<Download className="w-4 h-4" />}
        onClick={downloadNow}
        >Download Now</Button>
      </div>
    </div>
  )

}

export default App