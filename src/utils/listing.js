export function searchClasses(list, text) {
  const words = text.trim().toLowerCase();
  if (words === "") {
    return list;
  }
  return list.filter((item) => {
    const allText = [item.name, item.category, item.instructor, item.description].join(" ").toLowerCase();
    return allText.includes(words);
  });
}

export function filterByCategory(list, category) {
  if (category === "") {
    return list;
  }
  return list.filter((item) => item.category === category);
}

export function filterByLevel(list, level) {
  if (level === "") {
    return list;
  }
  return list.filter((item) => item.level === level);
}

export function filterByAvailable(list, onlyAvailable) {
  if (!onlyAvailable) {
    return list;
  }
  return list.filter((item) => item.seatsLeft > 0);
}

export function sortClasses(list, sortKey) {
  const copy = [...list];
  if (sortKey === "priceLow") {
    return copy.sort((a, b) => a.price - b.price);
  }
  if (sortKey === "priceHigh") {
    return copy.sort((a, b) => b.price - a.price);
  }
  if (sortKey === "seats") {
    return copy.sort((a, b) => b.seatsLeft - a.seatsLeft);
  }
  return copy.sort((a, b) => a.order - b.order);
}

export function getVisibleClasses(list, options) {
  let result = searchClasses(list, options.q);
  result = filterByCategory(result, options.category);
  result = filterByLevel(result, options.level);
  result = filterByAvailable(result, options.onlyAvailable);
  return sortClasses(result, options.sort);
}

export function getRelaxSuggestions(list, options) {
  const suggestions = [];

  if (options.q !== "") {
    const count = getVisibleClasses(list, { ...options, q: "" }).length;
    suggestions.push({ name: "q", label: "search text", count });
  }
  if (options.category !== "") {
    const count = getVisibleClasses(list, { ...options, category: "" }).length;
    suggestions.push({ name: "category", label: "type filter", count });
  }
  if (options.level !== "") {
    const count = getVisibleClasses(list, { ...options, level: "" }).length;
    suggestions.push({ name: "level", label: "level filter", count });
  }
  if (options.onlyAvailable) {
    const count = getVisibleClasses(list, { ...options, onlyAvailable: false }).length;
    suggestions.push({ name: "open", label: "seats filter", count });
  }

  return suggestions.filter((suggestion) => suggestion.count > 0);
}
