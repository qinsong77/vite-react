import React, { useState, Fragment } from 'react'
import ListView from './List-View'

export type Data = {
	id: number,
	message: string,
	time: string,
	level: 'success' | 'error' | 'warning'
}

function Item(item: Data) {
	return (
		<Fragment>
			<span>{ item.id }</span>
			<span>{ item.message }</span>
			<span>{ item.time }</span>
			<span>{ item.level }</span>
		</Fragment>
	)
}

function App() {
	
	function initData() {
		let count = 5000
		const res = []
		for(let i = 0; i < count; i++) {
			res.push({
				id: i,
				message: '{"input":{"type":"log"},"agent":{"hostname":"localhost.localdomain","id":"ce6eb8d0-9a16-46c9-b36a-8f07c51374c5","type":"filebeat","ephemeral_id":"81ec26a0-2fd1-4e01-bcf1-05f45e51fcb4","version":"7.6.2"},"@timestamp":"2021-03-08T07:15:41.900Z","ecs":{"version":"1.4.0"},"log":{"file":{"path":"/home/app/lqfm/x1a-logs/2021-03-08.0.log"},"offset":9544796},"level":"ERROR","host":{"hostname":"localhost.localdomain","os":{"kernel":"3.10.0-957.el7.x86_64","codename":"Core","name":"CentOS Linux","family":"redhat","version":"7 (Core)","platform":"centos"},"containerized":false,"name":"localhost.localdomain","id":"b82b722dfadb44349970aa0e35ec2e25","architecture":"x86_64"},"@version":"1","message":"take spanReport from blockQueeu in KafkaSenderThread catch exception java.lang.StringIndexOutOfBoundsException: String index out of range: 32","fields":{"ip":"110.122.31.175","index":"logs-link-monitor"},"type":"space","tags":["beats_input_codec_plain_applied"]}',
				time: new Date().toLocaleTimeString(),
				level: 'success'
			})
		}
		return res
	}
	
	const [ data, setData ] = useState<Data[]>(initData)
	
	console.log(data)
	
	
	
	return (
		<div className='virtual-list-container'>
			<h3>虚拟列表</h3>
			<ListView data={data} render={Item}/>
		</div>
	)
}

export default App
