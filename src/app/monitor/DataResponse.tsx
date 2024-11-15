import { Response } from "../api/detect/types";

interface Props {
    analysisData: Response
}

const DataResponse = ({ analysisData }: Props) => {
    if (!analysisData) return <p className="text-2xl font-bold text-black">분석된 결과가 없습니다.</p>

    return (
        <div className="flex flex-col items-center">
            <div className="p-8 bg-white/60 rounded-xl shadow-lg w-[36rem] h-[36rem] place-items-center">
                <img
                    src={analysisData.imageUrl}
                    alt="Analyzed Panel"
                    className="w-auto h-96 object-cover rounded-lg mb-6"
                />
                <div className="space-y-4 text-slate-700 ">
                    <p className="text-xl font-semibold break-words">
                        신뢰도: <span className="text-blue-600">
                            {analysisData.confidence && (analysisData.confidence * 100).toFixed(2)}%
                        </span>
                    </p>
                    <p className="text-xl font-semibold break-words">
                        상태: <span className="text-blue-600 capitalize">
                            {analysisData.label}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default DataResponse;