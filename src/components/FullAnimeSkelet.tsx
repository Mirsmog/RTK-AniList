import ContentLoader from "react-content-loader"
const FullAnimeSkelet = () => {
    return (
        <div className='container mx-auto min-h-screen max-w-[1024px] flex flex-col py-16'>
            <div className="mb-20 relative">
                <div className='bg-slate-600 mask mask-triangle-4 w-[80px] h-[98px] absolute playerTriaglePos'></div>
                <ContentLoader
                    speed={2}
                    width={1024}
                    height={576}
                    viewBox="0 0 1024 576"
                    backgroundColor='#7689a3'
                    foregroundColor='#8797ad'
                >
                    <rect x="0" y="0" width="1024" height="576" />
                </ContentLoader>
                <ul className='flex gap-3 flex-wrap px-2 py-2 max-h-48 h-[64px] overflow-y-auto bg-slate-900'></ul>
            </div>
            <div className="card card-side bg-base-100 shadow-xl overflow-hidden">
                <ContentLoader
                    speed={2}
                    width={230}
                    height={326}
                    viewBox="0 0 230 326"
                    backgroundColor='#7689a3'
                    foregroundColor='#8797ad'
                >
                    <rect x="0" y="0" width="230" height="326" />
                </ContentLoader>
                <ContentLoader
                    speed={2}
                    width={794}
                    height={326}
                    viewBox="0 0 794 326"
                    backgroundColor='#7689a3'
                    foregroundColor='#8797ad'
                >
                    <rect x="0" y="847" rx="12" ry="12" width="1024" height="326" />
                    <rect x="24" y="24" rx="12" ry="12" width="340" height="24" />
                    <rect x="705" y="24" rx="12" ry="12" width="64" height="24" />
                    <rect x="25" y="70" rx="12" ry="12" width="437" height="18" />
                    <rect x="24" y="110" rx="12" ry="12" width="65" height="28" />
                    <rect x="98" y="110" rx="12" ry="12" width="73" height="28" />
                    <rect x="182" y="110" rx="12" ry="12" width="65" height="28" />
                    <rect x="258" y="110" rx="12" ry="12" width="65" height="28" />
                    <rect x="24" y="174" rx="8" ry="8" width="351" height="12" />
                    <rect x="24" y="198" rx="8" ry="8" width="313" height="12" />
                    <rect x="24" y="221" rx="8" ry="8" width="300" height="12" />
                </ContentLoader>
            </div>
        </div>
    )
}
export default FullAnimeSkelet