// https://juejin.cn/post/6844904046436843527
// https://blog.csdn.net/yehuozhili/article/details/105135971
import React, { useEffect, useRef, useState } from 'react'
import { Button, message, Divider } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'
import { splitUploadMerge, upload, splitUpload } from '@api'
import Work from './hashWorker?worker'

interface fileChunkObj {
    chunk: Blob,
    hash: string
}

const SIZE = 10 * 1024 * 1024 // 切片大小

export default function FileUpload() {
    const [currentFile, setCurrentFile] = useState<File>(null)
    const [objectURL, setObjectURL] = useState<string>('')
    const inputEl = useRef<HTMLInputElement>(null)
    
    
    useEffect(() => {
        if (currentFile) {
            if (currentFile.type !== 'image/jpeg' && currentFile.type !== 'image/png' && currentFile.type !== 'image/jpg') {
                setObjectURL('')
                return
            }
            const objectUrl = window.URL.createObjectURL(currentFile)
            setObjectURL(objectUrl)
            return () => window.URL.revokeObjectURL(objectUrl)
        }
    }, [currentFile])
    
    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const file = e.target.files[0]
            file && setCurrentFile(file)
        }
    }
    
    function handleUpload() {
        if (inputEl.current) {
            inputEl.current.click()
        }
    }
    
    function submit() {
        if(!currentFile) return message.error('未选择文件')
        if(currentFile.size < SIZE) { // 直接上传
            uploadFileDirect()
        } else {
            startHandleUploadFile()
        }
    }
    
    function uploadFileDirect() {
        const formData = new FormData()
        formData.append('filename', currentFile.name)
        formData.append('file', currentFile)
        upload(formData)
            .then(res => {
                message.success(res.data)
            })
            .catch(e => {
                message.error(e)
            })
    }
    
    async function startHandleUploadFile() {
        const fileChunkList = createFileChunk(currentFile)
        const hash = await calculate(fileChunkList)
        const data: Array<fileChunkObj> = fileChunkList.map(({ file }, index) => ({
            chunk: file,
            hash: currentFile.name + '-' + index
        }))
        uploadChunks(data)
    }
    
    function createFileChunk(file: Blob, size = SIZE) {
        const fileChunkList = []
        let curr = 0
        while (curr < file.size) {
            fileChunkList.push({
                file: file.slice(curr, curr + size)
            })
            curr += size
        }
        return fileChunkList
    }
    
    function calculate(fileChunkList) {
        return new Promise(resolve => {
            const worker = new Work()
            console.log(worker)
            worker.postMessage({
                fileChunkList
            })
            worker.onmessage = e => {
                console.log(e)
                const { percentage, hash } = e.data
                console.log(percentage)
                console.log(hash)
                if(hash) {
                    resolve(hash)
                }
            }
        })
    }
    
    async function uploadChunks(dataList: Array<fileChunkObj>) {
        const requestList = dataList
            .map(({ chunk, hash }) => {
                const formData = new FormData()
                formData.append('chunk', chunk)
                formData.append('hash', hash)
                formData.append('filename', currentFile.name)
                return formData
            })
            .map((formData) => {
                return splitUpload(formData)
            })
        const allRes = await Promise.all(requestList)
        const res = await splitUploadMerge({
            size: SIZE,
            filename: currentFile.name
        })
        console.log(res)
    }
    
    return (
        <div className='file-upload-container'>
            <input type='file' ref={inputEl} onChange={handleOnChange} style={{ display: 'none' }}/>
            <Button
                style={{ marginLeft: '10px' }}
                type="primary"
                icon={<CloudUploadOutlined/>}
                onClick={handleUpload}>
                upload
            </Button>
            {
                currentFile && (
                    <div>
                        <h3>文件信息</h3>
                        <p>{ currentFile.name }</p>
                        <p>{ currentFile.size }</p>
                    </div>
                )
            }
            {
                objectURL &&
                (
                    <div style={{ margin: '10px'}}>
                        <img src={objectURL} style={{ width: 'auto', height: 'auto', maxHeight: '300px'}}/>
                    </div>
                )
            }
            <Divider/>
            <Button
                style={{ marginLeft: '10px' }}
                type="primary"
                icon={<CloudUploadOutlined/>}
                onClick={submit}>
                submit
            </Button>
        </div>
    )
}
