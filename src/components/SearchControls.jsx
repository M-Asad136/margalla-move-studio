import { categories, levels } from "../data/classes.js";

function SearchControls({ values, onChange, onClear }) {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form className="controls" role="search" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="search">Search classes</label>
        <input
          id="search"
          type="search"
          placeholder="Name, instructor or type"
          value={values.q}
          onChange={(event) => onChange("q", event.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="category">Type</label>
        <select id="category" value={values.category} onChange={(event) => onChange("category", event.target.value)}>
          <option value="">All types</option>
          {categories.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="level">Level</label>
        <select id="level" value={values.level} onChange={(event) => onChange("level", event.target.value)}>
          <option value="">All levels</option>
          {levels.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="sort">Sort by</label>
        <select id="sort" value={values.sort} onChange={(event) => onChange("sort", event.target.value)}>
          <option value="earliest">Earliest in the week</option>
          <option value="priceLow">Price: low to high</option>
          <option value="priceHigh">Price: high to low</option>
          <option value="seats">Most seats left</option>
        </select>
      </div>

      <div className="field field-check">
        <input
          id="available"
          type="checkbox"
          checked={values.onlyAvailable}
          onChange={(event) => onChange("open", event.target.checked ? "1" : "")}
        />
        <label htmlFor="available">Only classes with seats</label>
      </div>

      <button type="button" className="button button-secondary" onClick={onClear}>
        Clear filters
      </button>
    </form>
  );
}

export default SearchControls;
