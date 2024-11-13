interface TextListProps {
    titleS: string;
    valueS: string,
    placeholderS: string;
    onChange?: (value: string) => void;
}

export default function textlist({ titleS, valueS, placeholderS, onChange }: TextListProps ) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <div className="m-8">
            <div className="inline-block font-bold mb-2 text-sm w-[90px] text-right">{titleS}</div>
            <input 
                className="inline w-[250px] border-gray border-b-2 items-center text-sm focus:bg-white-green ml-5 pl-2 pt-0.5 pb-0.5"
                type="text" 
                value={valueS} 
                placeholder={placeholderS} 
                onChange={handleChange} />
        </div>
    )
}