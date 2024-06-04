import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "../App.css";

export const QuoteList = ({
  loading,
  error,
  quoteList,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="quote-list">
      <div className="quote-container">
        {loading && <p>Loading...</p>}
        {error && <p className="error">Error: {error.message}</p>}
        <ul>
          {quoteList.length > 0 &&
            quoteList.map((item) => {
              return (
                <div className="quote">
                  <li>
                    <span className="quote-text">{`“${item.quoteText}“`}</span>{" "}
                    <span className="quote-author">{`- ${item.authorName}`}</span>
                  </li>

                  <div className="quote-actions">
                    <FaEdit className="icon" onClick={() => handleEdit(item)} />
                    <MdDelete
                      className="icon"
                      onClick={() => handleDelete(item)}
                    />
                  </div>
                </div>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
