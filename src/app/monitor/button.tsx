import Image from 'next/image';

interface ChooseFuncProps {
    srcS: string;
    altS: string;
    widthS: number | `${number}`;
    heightS: number | `${number}`;
    classS1: string;
    classS2: string;
    textS: string;
    onClick?: () => void;
}

export default function ChooseFunc({ srcS, altS, widthS, heightS, classS1, classS2, textS, onClick }: ChooseFuncProps ) {
    return (
        <div 
            className="flex justify-around bg-white-green w-[230px] h-[50px] rounded-2xl outline-double outline-4 outline-light-green"
            onClick={onClick}
        >
            <Image src={srcS} alt={altS} width={widthS} height={heightS} className={classS1}></Image>
            <div className={`flex items-center ${classS2}`}>{textS}</div>
        </div>
    )
}