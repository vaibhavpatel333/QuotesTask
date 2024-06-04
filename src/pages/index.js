import React, { useCallback, useState } from "react";
import "../App.css";
import useQuoteApi from "../Hooks/quoteAPIHook";
import { apiRoute } from "../helper";
import { QuoteList } from "../component/QuoteList";

const Quote = () => {
  const {
    data: quoteList,
    loading,
    error,
    createQuote,
    updateQuote,
    deleteQuote,
    formQuoteError,
    setError,
    setFormQuoteError,
  } = useQuoteApi(apiRoute("quotes"));
  const [formData, setFormData] = useState({
    quoteText: "",
    authorName: "",
    id: "",
  });
  const [formError, setFormError] = useState("");

  const handleOnchange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  const handleEdit = useCallback((quote) => {
    setFormData({
      authorName: quote.authorName,
      quoteText: quote.quoteText,
      id: quote._id,
    });
    setFormError("")
  }, []);

  const handleDelete = useCallback(
    async (quote) => {
      await deleteQuote(quote._id);
    },
    [deleteQuote]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!formData.quoteText) {
        setFormError("Please Enter Quote Text");
      } else if (!formData.authorName) {
        setFormError("Please Enter Author Name");
      } else {
        setFormError("");
        try {
          if (formData.id) {
            await updateQuote(formData);
          } else {
            await createQuote(formData);
          }
          setTimeout(() => {
            setFormQuoteError(null);
            setError(null);
          }, 2000);
          setFormData({ quoteText: "", authorName: "", id: "" });
        } catch (error) {
          console.error("Error creating/updating quote:", error.message);
        }

        // Handle further submission logic here
      }
    },
    [formData, createQuote, updateQuote, setFormQuoteError, setError]
  );

  return (
    <div className="App">
      <div className="wrapper">
        <form className="form-signin" onSubmit={handleSubmit}>
          <div className="field">
            <div>
              <label>Quote Text:- </label>
            </div>
            <div>
              <textarea
                type="text"
                name="quoteText"
                class="form-control"
                placeholder="Quote Text"
                value={formData.quoteText}
                onChange={(e) => handleOnchange(e)}
              />
            </div>
          </div>
          <div className="field">
            <div>
              <label>Author Name:- </label>
            </div>{" "}
            <div>
              <input
                type="text"
                name="authorName"
                class="form-control"
                placeholder="Author Name"
                value={formData.authorName}
                onChange={(e) => handleOnchange(e)}
              />
            </div>
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            {formData.id ? "Update" : "Submit"}
          </button>
          {formError ? <p className="error">{formError}</p> : <></>}
          {formQuoteError ? (
            <p className="error">{formQuoteError.message}</p>
          ) : (
            <></>
          )}
        </form>
      </div>
      <QuoteList
        loading={loading}
        error={error}
        quoteList={quoteList}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Quote;
