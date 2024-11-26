import { useState } from "react";
import { uploadRoflFile } from "utils/uploadFile";

export const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUpLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 파일 업로드 핸들러
  const handleUpload = async () => {
    if (!file) {
      setMessage("파일을 선택해주세요.");
      return;
    }

    setUpLoading(true);
    setMessage("");

    try {
      await uploadRoflFile(file);
      setMessage("업로드 성공");
    } catch (e) {
      setMessage("업로드 실패");
    } finally {
      setUpLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="flex items-end justify-start">
      <div>
        <div className="flex gap-5 mb-2">
          <input type="file" accept=".rofl" onChange={handleFileChange} />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-primary text-white px-4 py-2 rounded-md ml-2"
          >
            {uploading ? "업로딩 중..." : "매치추가"}
          </button>
        </div>
        {message && <p className="text-end">{message}</p>}
      </div>
    </div>
  );
};
