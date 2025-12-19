import { Button, Form, Input, Modal, QRCode } from "antd";
import { Download, RefreshCcw } from "lucide-react";
import React, { useRef, useState } from "react";
import '@ant-design/v5-patch-for-react-19';
import { useForm } from "antd/es/form/Form";


const App = () => {

  const [form] = useForm()

  const [icon ,setIcon] = useState(null)
  const [open,SetOpen] = useState(false)
  const [qr,SetQr] = useState({
    value:'https://www.youtube.com/',
    icon:'',
    bgcolor:'white',
    color:'black'
  })

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

  const generateQr = (values) =>{
    
    values.bgcolor = values.bgcolor || "white"
    values.color = values.color || "black"
    values.icon = icon
    // SetQr((prev)=>({
    //   ...prev,
    //   ...values

    // }))
    
    const newQr = {
    value:values.url,
    icon:icon,
    bgcolor:values.bgcolor,
    color:values.color
    }

    SetQr(newQr)

    SetOpen(false)
  }

  const chooseFile = (e)=>{
    const file = e.target.files[0]
    const url = URL.createObjectURL(file)
    setIcon(url)
    }

    const handleClose = () =>{
      SetOpen(false)
      form.resetFields()
      setIcon('')
    }


  return(
    <div className="bg-gray-100 h-screen py-12 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-16">QR Code Generator</h1>
      <div ref={divRef} className="mb-12 rounded-xl p-4 bg-white shadow-lg w-fit hover:scale-115 transition-transform duration-300 hover:shadow-2xl">
       <QRCode value={qr.value}
       size = {300}
       icon={qr.icon}
       bgColor={qr.bgcolor}
       color={qr.color}
       />
      </div>
      <div className="flex gap-2">
        <Button size="large" 
        type="primary" 
        className="!bg-gradient-to-r !from-violet-600 !via-blue-500 !to-indigo-600 !border-none hover:!scale-105 "
        icon={<Download className="w-4 h-4" />}
        onClick={downloadNow}
        >Download Now</Button>

         <Button size="large" 
        type="primary" 
        className="!bg-gradient-to-r !from-green-600 !via-emerald-600 !to-cyan-600 !border-none hover:!scale-105 "
        icon={<RefreshCcw className="w-4 h-4" />}
        onClick={()=>SetOpen(true)}
        >Generate New QR</Button>
      </div>

      <Modal open={open} footer={null} onCancel={handleClose}>
        <h1 className="text-lg font-medium">Generate Qr</h1>
        <Form  onFinish={generateQr} form={form}>
          <Form.Item 
          label="URL"
          rules={[{required:true,type:"url"}]}
          name="url"
          >
            <Input 
            size="large"
            placeholder="https://domainname.com"
            />
          </Form.Item>

           <Form.Item 
          label="BG Color"
          name="bgcolor"
          >
            <Input 
            size="large"
            type="color"
            />
          </Form.Item>

           <Form.Item 
          label="Color"
          name="color"
          >
            <Input 
            size="large"
            type="color"
            />
          </Form.Item>

           <Form.Item 
          label="Logo"
          name="logo"
          >
            <Input 
            size="large"
            type="file"
            accept="image/*"
            onChange={chooseFile}
            />
          </Form.Item>

          <Form.Item>
            <Button size="large" type="primary" htmlType="submit">
              Generate
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      
    </div>
  )

}

export default App
