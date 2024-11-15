interface NumberListProps {
    titleS: string;
    valueS: string,
    onChange?: (value: string) => void;
}

export default function numberlist({ titleS, valueS, onChange }: NumberListProps ) {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <div className="m-8">
            <div className="inline-block font-bold mb-2 text-sm w-[90px] text-right">{titleS}</div>
            <select 
                className="inline w-[250px] border-gray border-b-2 items-center text-sm focus:bg-gradient-to-r from-blue-100 to-cyan-100 focus:outline-none ml-5 pl-2 pt-0.5 pb-0.5"
                value={valueS} 
                onChange={handleChange}
            >
                <option value="1">1일</option>  
                <option value="2">2일</option>  
                <option value="3">3일</option>  
                <option value="4">4일</option>  
                <option value="5">5일</option>  
                <option value="6">6일</option>    
                <option value="7">7일</option>
            </select>
        </div>
    )
}