export default function EventHeader({ currentTab, setTab, createButton }) {
    return (
        <div className="flex justify-center items-center sticky top-0">
            <div className="h-20 w-96 bg-white border-b-2 border-stone-400">
                <h1 className="flex items-center justify-between h-full">
                    <button
                        className={`text-xl font-medium ${currentTab == 'chat' ? "text-green-600" : ''}`}
                        onClick={() => setTab("chat")}>CHAT
                    </button>
                    <button
                        className={`text-xl font-medium ${currentTab == 'memories' ? "text-green-600" : ''}`}
                        onClick={() => setTab("memories")}>MEMORIES
                    </button>
                    <button
                    className={`px-2 py-2 bg-green-600 rounded-md text-white disabled:bg-slate-400`}
                    onClick={createButton}
                    disabled={currentTab == 'chat'}
                    >
                        Create
                    </button>
                </h1>
            </div>
        </div>
    )
}