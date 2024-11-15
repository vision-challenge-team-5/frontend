interface RadioListProps {
    titleS: string;
    valueS: string,
    onChange?: (value: string) => void;
}

export default function radiolist({ titleS, valueS, onChange }: RadioListProps ) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <div className="m-8">
            <div className="inline-block font-bold mb-2 text-sm w-[90px] text-right">{titleS}</div>
            <label className="ml-7 accent-blue-500">
                <input 
                    type="radio" 
                    name={titleS}
                    value="yes" 
                    checked={valueS === 'yes'} 
                    onChange={handleChange}
                />
                예
            </label>
            <label className="accent-blue-500">
                <input 
                    type="radio" 
                    name={titleS}
                    value="no" 
                    className="ml-3"
                    checked={valueS === 'no'} 
                    onChange={handleChange} 
                />
                아니오
            </label>
        </div>
    )
}