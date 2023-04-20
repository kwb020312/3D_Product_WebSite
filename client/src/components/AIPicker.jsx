import React from "react";

import CustomButton from "./CustomButton";

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
  return (
    <div className="aipicker-container">
      <textarea
        className="aipicker-textarea"
        placeholder="AI에게 부탁하세요!"
        rows="5"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>
      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          <CustomButton
            type={"outline"}
            title={"AI가 이미지를 만드는 중"}
            customStyles={"text-xs"}
          />
        ) : (
          <>
            <CustomButton
              type={"filled"}
              title={"AI 로고생성"}
              handleClick={() => handleSubmit("logo")}
              customStyles={"text-xs"}
            />
            <CustomButton
              type={"filled"}
              title={"AI 무늬생성"}
              handleClick={() => handleSubmit("full")}
              customStyles={"text-xs"}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AIPicker;
