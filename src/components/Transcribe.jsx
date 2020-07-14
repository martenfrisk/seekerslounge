import React from 'react'
import TranscriptEditor from '@bbc/react-transcript-editor'
import loadable from '@loadable/component'
import SttTypeSelect from "./transcribe/select-stt-json-type";
import ExportFormatSelect from "./transcribe/select-export-format";
import ImportScripts, { scripts } from "./transcribe/import-scripts";
import {
  // loadLocalSavedData,
  // isPresentInLocalStorage,
  localSave
} from "./transcribe/local-storage";
import DEMO_TRANSCRIPT from '../assets/transcribeDemo/mini-52.json'
import DEMO_MEDIA_URL from '../assets/transcribeDemo/mini-52-edit.mp3'

scripts.forEach((i) => {
  loadable(() => import('../transcriptsAWS/' + i))
})

const DEMO_TITLE = 'Mini-52 - Post-game Conference Pt. 2'



class Transcribe extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			transcriptData: null,
			mediaUrl: null,
			isTextEditable: true,
			spellCheck: false,
			sttType: 'amazontranscribe',
			analyticsEvents: [],
			title: '',
			fileName: '',
			autoSaveData: {},
			autoSaveContentType: 'amazontranscribe',
      autoSaveExtension: 'json',
      transcriptLoad: {}
		}

		this.transcriptEditorRef = React.createRef()
	}

	loadDemo = () => {
		// if (isPresentInLocalStorage(DEMO_MEDIA_URL)) {
		// 	const transcriptDataFromLocalStorage = loadLocalSavedData(DEMO_MEDIA_URL)
		// 	this.setState({
		// 		transcriptData: transcriptDataFromLocalStorage,
		// 		mediaUrl: DEMO_MEDIA_URL,
		// 		title: DEMO_TITLE,
		// 		sttType: 'amazontranscribe'
		// 	})
		// } else {
			this.setState({
				transcriptData: DEMO_TRANSCRIPT,
				mediaUrl: DEMO_MEDIA_URL,
				title: DEMO_TITLE,
				sttType: 'amazontranscribe'
			})
		// }
	}

	// https://stackoverflow.com/questions/8885701/play-local-hard-drive-video-file-with-html5-video-tag
	handleLoadMedia = (files) => {
		const file = files[0]
		const videoNode = document.createElement('video')
		const canPlay = videoNode.canPlayType(file.type)

		if (canPlay) {
			const fileURL = URL.createObjectURL(file)
			this.setState({
				// transcriptData: DEMO_TRANSCRIPT,
				mediaUrl: fileURL,
				fileName: file.name
			})
		} else {
			alert('Select a valid audio or video file.')
		}
	}

	handleLoadMediaUrl = () => {
		const fileURL = prompt("Paste the URL you'd like to use here:")

		this.setState({
			// transcriptData: DEMO_TRANSCRIPT,
			mediaUrl: fileURL
		})
	}

	handleLoadTranscriptJson = (files) => {
		const file = files[0]

		if (file.type === 'application/json') {
			const fileReader = new FileReader()

			fileReader.onload = (event) => {
				this.setState({
					transcriptData: JSON.parse(event.target.result)
				})
			}

			fileReader.readAsText(file)
		} else {
			alert('Select a valid JSON file.')
		}
	}

	handleIsTextEditable = (e) => {
		this.setState({
			isTextEditable: e.target.checked
		})
	}

	handleSpellCheck = (e) => {
		this.setState({
			spellCheck: e.target.checked
		})
  }
  
  handleTranscriptLoad = (event) => {
    console.log(event)
    this.setState({
      transcriptLoad: event.target.value
    })
    console.log(this.state.transcriptLoad)
  }

	// https://stackoverflow.com/questions/21733847/react-jsx-selecting-selected-on-selected-select-option
	handleSttTypeChange = (event) => {
		this.setState({ [event.target.name]: event.target.value })
	}

	handleExportFormatChange = (event) => {
		console.log(event.target.name, event.target.value)
		this.setState({ [event.target.name]: event.target.value })
	}

	exportTranscript = () => {
		// console.log('export')
		// eslint-disable-next-line react/no-string-refs
		const { data, ext } = this.transcriptEditorRef.current.getEditorContent(this.state.exportFormat)
		let tmpData = data
		if (ext === 'json') {
			tmpData = JSON.stringify(data, null, 2)
		}
		if (ext !== 'docx') {
			this.download(tmpData, `${this.state.mediaUrl}.${ext}`)
		}
	}

	// https://stackoverflow.com/questions/2897619/using-html5-javascript-to-generate-and-save-a-file
	download = (content, filename, contentType) => {
		console.log('download')
		const type = contentType || 'application/octet-stream'
		const link = document.createElement('a')
		const blob = new Blob([ content ], { type: type })

		link.href = window.URL.createObjectURL(blob)
		link.download = filename
		// Firefox fix - cannot do link.click() if it's not attached to DOM in firefox
		// https://stackoverflow.com/questions/32225904/programmatical-click-on-a-tag-not-working-in-firefox
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	clearLocalStorage = () => {
		localStorage.clear()
		console.info('Cleared local storage.')
	}

	handleAnalyticsEvents = (event) => {
		this.setState({ analyticsEvents: [ ...this.state.analyticsEvents, event ] })
	}

	handleChangeTranscriptTitle = (newTitle) => {
		this.setState({
			title: newTitle
		})
	}

	handleChangeTranscriptName = (value) => {
		this.setState({ fileName: value })
	}

	handleAutoSaveChanges = (newAutoSaveData) => {
		// console.log('handleAutoSaveChanges', newAutoSaveData)
		const { data, ext } = newAutoSaveData
		this.setState({ autoSaveData: data, autoSaveExtension: ext })
		// Saving to local storage
		localSave(this.state.mediaUrl, this.state.fileName, data)
	}
	render() {
		return (
			<div className="px-2">
				<div className="w-full text-2xl text-center">Transcript Editor</div>
        <div className="w-1/2 pl-4 my-2 border-t border-b border-l-4 border-r border-red-700">This is an experimental transcript editor. Code is copied from the demo of <a href="https://github.com/bbc/react-transcript-editor" target="_blank" rel="noopener noreferrer">BBC react-transcript-editor</a>. Only tested with AWS Transcribe transcript files.</div>
				<button onClick={() => this.loadDemo()} className="underline">Load Demo (might take a few seconds to load)</button>
				<div className="flex flex-wrap px-12 py-4">
					<section className="flex flex-wrap w-1/2 pl-4 mb-4 border-l-8 border-blue-600">
						<div className="w-full text-xl">Load Audio</div>
						<button
							onClick={() => this.handleLoadMediaUrl()}
							className="w-full pl-4 mb-1 text-left underline"
						>
							From URL (click me)
						</button>
						<label className="pl-4 mb-1 mr-4" htmlFor="mediaFile">
							From Computer
						</label>
						<input type={'file'} id={'mediaFile'} onChange={(e) => this.handleLoadMedia(e.target.files)} />
						{this.state.fileName !== '' ? <label>{this.state.fileName}</label> : null}
					</section>

					<section className="flex flex-wrap w-1/2 pl-4 mb-4 border-l-8 border-blue-600">
						<label className="w-full text-xl">Load Transcript</label>
						<div className="w-1/2 pl-4">Input format</div>
						<SttTypeSelect
							className="w-1/2 border border-gray-500"
							name={'sttType'}
							value={this.state.sttType}
							handleChange={this.handleSttTypeChange}
						/>
            <div className="w-1/2 pl-4 text-sm line-through">Choose transcript (doesn't work yet)</div>
            <ImportScripts
              className="w-1/2 border border-gray-500"
              name={'impScripts'}
              value={this.state.transcriptLoad}
              handleChange={this.handleTranscriptLoad}
              disabled
            />
						<label className="pl-4 mb-1 mr-4" htmlFor="transcriptFile">
							From Computer
						</label>
						<input
							type={'file'}
							id={'transcriptFile'}
							onChange={(e) => this.handleLoadTranscriptJson(e.target.files)}
						/>
						{this.state.transcriptData !== null ? <label>Transcript loaded.</label> : null}
					</section>

					<section className="flex flex-wrap w-1/2 pl-4 mb-4 border-l-8 border-blue-400">
						<label className="w-full">Export Transcript</label>
						<ExportFormatSelect
							className="w-1/4 mr-2 border border-gray-500"
							name={'exportFormat'}
							value={this.state.exportFormat}
							handleChange={this.handleExportFormatChange}
						/>
            {this.state.transcriptData !== null ?
						<button onClick={() => this.exportTranscript()} className="underline">
							Export File
						</button> :
            <div>Nothing to export</div>
            }
					</section>

					<section className="flex flex-wrap w-1/2 pl-4 mb-4 border-l-8 border-blue-400">
						<label className="mr-2">Transcript Title (Optional)</label>
						<input
							className="p-1 border border-gray-500"
							type="text"
							value={this.state.title}
							onChange={(e) => this.handleChangeTranscriptTitle(e.target.value)}
						/>
					</section>

					<section className="flex flex-wrap px-4 border-l-8 border-blue-200">
						<label className="w-full text-xl">Options</label>

						<div className="mr-4">
							<label className="mr-2" htmlFor={'textIsEditableCheckbox'}>
								Text Is Editable
							</label>
							<input
								id={'textIsEditableCheckbox'}
								type="checkbox"
								checked={this.state.isTextEditable}
								onChange={this.handleIsTextEditable}
							/>
						</div>

						<div className="mr-4">
							<label className="mr-2" htmlFor={'spellCheckCheckbox'}>
								Spell Check
							</label>
							<input
								id={'spellCheckCheckbox'}
								type="checkbox"
								checked={this.state.spellCheck}
								onChange={this.handleSpellCheck}
							/>
						</div>

						<button onClick={() => this.clearLocalStorage()}>Clear Local Storage</button>
					</section>
				</div>

				<TranscriptEditor
					transcriptData={this.state.transcriptData}
					fileName={this.state.fileName}
					mediaUrl={this.state.mediaUrl}
					isEditable={this.state.isTextEditable}
					spellCheck={this.state.spellCheck}
					sttJsonType={this.state.sttType}
					handleAnalyticsEvents={this.handleAnalyticsEvents}
					title={this.state.title}
					ref={this.transcriptEditorRef}
					handleAutoSaveChanges={this.handleAutoSaveChanges}
					autoSaveContentType={this.state.autoSaveContentType}
					mediaType={'audio'}
				/>

				<section style={{ height: '250px', width: '50%', float: 'left' }}>
					<h3>Components Analytics</h3>
					<textarea
						style={{ height: '100%', width: '100%' }}
						value={JSON.stringify(this.state.analyticsEvents, null, 2)}
						disabled
					/>
				</section>

				<section style={{ height: '250px', width: '50%', float: 'right' }}>
					<h3>
						Auto Save data:{' '}
						<code>
							{this.state.autoSaveContentType}| {this.state.autoSaveExtension}
						</code>
					</h3>
					<textarea
						style={{ height: '100%', width: '100%' }}
						value={
							this.state.autoSaveExtension === 'json' ? (
								JSON.stringify(this.state.autoSaveData, null, 2)
							) : (
								this.state.autoSaveData
							)
						}
						disabled
					/>
				</section>
			</div>
		)
	}
}
export default Transcribe
