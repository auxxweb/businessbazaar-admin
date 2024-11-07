import React, { useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import useBusiness from "../../Hooks/business/useBusiness";

const TermsAndConditions = () => {
  const { createTerms, terms, getTerms, updateTerms,loading } = useBusiness();
  const [data, setData] = useState(terms?.data);

  const handleCreate = async (tData) => {
    await createTerms({ data: tData });
  };

  const handleUpdate = async (tData) => {
    await updateTerms({data:tData});
  };

  useEffect(() => {
    setData(terms?.data);
  }, [terms?.data]);

  useEffect(() => {
    const fetchTerms = async () => {
      await getTerms();
    };
    fetchTerms();
  }, []);

  return (
    <div>
      <RichTextEditor
        data={data}
        handleCreate={handleCreate}
        setData={setData}
        handleUpdate={handleUpdate}
        loading={loading}
      />
    </div>
  );
};

export default TermsAndConditions;
