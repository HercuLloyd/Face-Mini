export default function PostListContainer({children}) {
    return (
        <div className="flex h-full w-full justify-center">
            <div className="flex flex-col gap-4 pb-4 divide-y divide-slate-400 ">
                {children}
            </div>
        </div>
    )
}