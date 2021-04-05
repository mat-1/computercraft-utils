/** @noSelfInFile */
declare namespace rednet {
	/** The channel used by the Rednet API to broadcast messages. */
	let CHANNEL_BROADCAST: number
	/** The channel used by the Rednet API to repeat messages. */
	let CHANNEL_REPEAT: number
	
	/**
	 * Opens a modem with the given peripheral name, allowing it to send and receive messages over rednet.
	 * This will open the modem on two channels: one which has the same ID as the computer, and another on the broadcast channel.
	 * @param modem The name of the modem to open.
	 * @throws If there is no such modem with the given name
	*/
	export function open(modem: string): void

	/**
	 * Close a modem with the given peripheral name, meaning it can no longer send and receive rednet messages.
	 * @param modem The side the modem exists on. If not given, all open modems will be closed.
	 * @throws If there is no such modem with the given name
	*/
	export function close(modem?: string): void

	/**
	 * Determine if rednet is currently open.
	 * @param modem Which modem to check. If not given, all connected modems will be checked.
	 * @returns If the given modem is open.
	*/
	export function isOpen(modem?: string): boolean

	/**
	 * Allows a computer or turtle with an attached modem to send a message intended for a system with a specific ID. At least one such modem must first be opened before sending is possible.
	 * 
	 * Assuming the target was in range and also had a correctly opened modem, it may then use rednet.receive to collect the message.
	 * @param nRecipient The ID of the receiving computer.
	 * @param message The message to send. This should not contain coroutines or functions, as they will be converted to nil.
	 * @param sProtocol The "protocol" to send this message under. When using rednet.receive one can filter to only receive messages sent under a particular protocol.
	 * @returns If this message was successfully sent (i.e. if rednet is currently open). Note, this does not guarantee the message was actually received.
	*/
	export function send(nRecipient: number, message: string, sProtocol?: string): boolean

	/**
	 * Broadcasts a string message over the predefined CHANNEL_BROADCAST channel. The message will be received by every device listening to rednet.
	 * @param message The message to send. This should not contain coroutines or functions, as they will be converted to nil.
	 * @param sProtocol The "protocol" to send this message under. When using rednet.receive one can filter to only receive messages sent under a particular protocol.
	 * @returns If this message was successfully sent (i.e. if rednet is currently open). Note, this does not guarantee the message was actually received.
	*/
	export function broadcast(message: string, sProtocol?: string): boolean

	/**
	 * Wait for a rednet message to be received, or until nTimeout seconds have elapsed.
	 * @param sProtocolFilter The protocol the received message must be sent with. If specified, any messages not sent under this protocol will be discarded.
	 * @param nTimeout The number of seconds to wait if no message is received.
	 * @returns If this message was successfully sent (i.e. if rednet is currently open). Note, this does not guarantee the message was actually received.
	 * @tuplereturn
	*/
	export function receive(sProtocolFilter?: string): [ number, any, string | null ] | [ null ]

	/**
	 * Register the system as "hosting" the desired protocol under the specified name. If a rednet lookup is performed for that protocol (and maybe name) on the same network, the registered system will automatically respond via a background process, hence providing the system performing the lookup with its ID number.
	 * 
	 * Multiple computers may not register themselves on the same network as having the same names against the same protocols, and the title localhost is specifically reserved. They may, however, share names as long as their hosted protocols are different, or if they only join a given network after "registering" themselves before doing so (eg while offline or part of a different network).
	 * @param sProtocol The protocol this computer provides.
	 * @param sHostname The name this protocol exposes for the given protocol.
	 * @throws If trying to register a hostname which is reserved, or currently in use.
	*/
	export function host(sProtocolFilter?: string): void

	/**
	 * Stop hosting a specific protocol, meaning it will no longer respond to rednet.lookup requests.
	 * @param sProtocol The protocol to unregister your self from.
	*/
	export function unhost(sProtocol: string): void

	/**
	 * Search the local rednet network for systems hosting the desired protocol and returns any computer IDs that respond as "registered" against it.
	 * 
	 * If a hostname is specified, only one ID will be returned (assuming an exact match is found).
	 * @param sProtocol The protocol to search for.
	 * @param sHostname The hostname to search for.
	 * @returns A list of computer IDs hosting the given protocol, or nil if none exist.
	 * @returns The computer ID with the provided hostname and protocol, or nil if none exists.
	*/
	export function lookup(sProtocol: string, sHostname?: string): number[] | number | null

	/**
	 * Listen for modem messages and converts them into rednet messages, which may then be received.
	 * 
	 * This is automatically started in the background on computer startup, and should not be called manually.
	*/
	export function run(): void
}
