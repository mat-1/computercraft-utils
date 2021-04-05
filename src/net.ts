import * as state from './state'

// TODO: make this check to see if it exists
rednet.open('right')

export async function broadcastPosition() {
	const data = {
		position: state.currentPosition.toString()
	}
	rednet.broadcast(textutils.serializeJSON(data), os.getComputerLabel())
}
