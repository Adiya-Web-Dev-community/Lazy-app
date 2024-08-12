import { useState } from "react";
import { MdAdd, MdOutlineDelete } from "react-icons/md";

interface FaqItemType {
  question: string;
  answer: string;
}
interface FaqFormType {
  items: FaqItemType[];
}

const FaqDynamicInput = () => {
  const [faqData, setFaqData] = useState<FaqFormType>({
    items: [{ question: "", answer: "" }],
  });

  const handleItemChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedItems = faqData.items.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setFaqData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const addItem = () => {
    setFaqData((prev) => ({
      ...prev,
      items: [...prev.items, { question: "", answer: "" }],
    }));
  };

  const removeItem = (index: number) => {
    const updatedItems = faqData.items.filter((_, i) => i !== index);
    setFaqData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };
  return (
    <div className="md:col-span-2">
      {faqData.items.map((item, index) => (
        <div key={index} className="flex items-start gap-4 py-4 ">
          <div className="grid w-full gap-4">
            <input
              value={item?.question}
              type="text"
              onChange={(e) => handleItemChange(e, index)}
              name="question"
              className="w-full h-10 pl-4 font-medium bg-[#252525] focus:border-[#DEE1E2] border-transparent border rounded-md outline-none"
              placeholder="FAQ Question"
              required
            />
            <textarea
              value={item?.answer}
              onChange={(e) => handleItemChange(e, index)}
              name="answer"
              className="w-full h-24 py-4 px-4 font-medium border-gray-400 bg-[#252525] focus:border-[#DEE1E2] border-transparent border rounded-md outline-none"
              placeholder="FAQ Answer"
              required
            />
          </div>
          {faqData.items.length > 1 && (
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="px-2 py-1 mb-4 text-sm font-bold rounded justify-self-end bg-rose-800 hover:bg-rose-700 focus:outline-none focus:shadow-outline disabled:bg-gray-700 disabled:cursor-not-allowed"
              //   disabled={inputFields.length === 1}
            >
              <MdOutlineDelete className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={addItem}
        className="flex items-center p-2 bg-teal-800 rounded justify-self-start"
      >
        <MdAdd className="w-5 h-5" />
        <span className="text-sm font-medium"> New Item</span>
      </button>
    </div>
  );
};

export default FaqDynamicInput;
