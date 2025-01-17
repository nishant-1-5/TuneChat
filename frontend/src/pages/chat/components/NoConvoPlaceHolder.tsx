import { CiMusicNote1 } from "react-icons/ci";


const NoConversationPlaceholder = () => (
	<div className='flex flex-col items-center justify-center h-full space-y-6'>
		<CiMusicNote1 className='size-16 animate-bounce text-emerald-500' />
		<div className='text-center'>
			<h3 className='text-zinc-300 text-lg font-medium mb-1'>No conversation selected</h3>
			<p className='text-zinc-500 text-sm'>Choose a friend to start chatting</p>
		</div>
	</div>
);

export default NoConversationPlaceholder;