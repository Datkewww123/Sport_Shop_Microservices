// Backend/src/utils/fuzzySearch.js
// Advanced fuzzy matching utility for Vietnamese product search

// Hàm xoá dấu tiếng Việt
function removeVietnameseDiacritics(str) {
  const diacriticsMap = {
    'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
    'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
    'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
    'đ': 'd',
    'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
    'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
    'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
    'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
    'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
    'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
    'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
    'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
    'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
    'À': 'A', 'Á': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A',
    'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ặ': 'A',
    'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ậ': 'A',
    'Đ': 'D',
    'È': 'E', 'É': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E',
    'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ệ': 'E',
    'Ì': 'I', 'Í': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',
    'Ò': 'O', 'Ó': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O',
    'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ộ': 'O',
    'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ợ': 'O',
    'Ù': 'U', 'Ú': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ụ': 'U',
    'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ự': 'U',
    'Ỳ': 'Y', 'Ý': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y'
  };

  return str
    .split('')
    .map(char => diacriticsMap[char] || char)
    .join('');
}

// Levenshtein distance - để tính độ giống nhau giữa 2 chuỗi
function levenshteinDistance(a, b) {
  const track = Array(b.length + 1).fill(null).map(() =>
    Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= b.length; j += 1) {
    track[j][0] = j;
  }

  for (let j = 1; j <= b.length; j += 1) {
    for (let i = 1; i <= a.length; i += 1) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }

  return track[b.length][a.length];
}

// Tính độ similarity (0-1)
function calculateSimilarity(str1, str2) {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  
  if (longer.length === 0) return 1.0;
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

// Fuzzy search function
function fuzzySearch(query, text) {
  // Remove Vietnamese diacritics from both
  const normalizedQuery = removeVietnameseDiacritics(query).toLowerCase();
  const normalizedText = removeVietnameseDiacritics(text).toLowerCase();

  // 1. Exact match (highest priority)
  if (normalizedText === normalizedQuery) {
    return 1.0;
  }

  // 2. Contains match
  if (normalizedText.includes(normalizedQuery)) {
    return 0.9;
  }

  // 3. Word starts with query
  const words = normalizedText.split(/\s+/);
  if (words.some(w => w.startsWith(normalizedQuery))) {
    return 0.8;
  }

  // 4. Multiple word prefix matches
  const queryWords = normalizedQuery.split(/\s+/);
  const matchedWords = queryWords.filter(qw => 
    words.some(w => w.startsWith(qw) || w.includes(qw))
  );
  if (matchedWords.length > 0) {
    return 0.7 * (matchedWords.length / queryWords.length);
  }

  // 5. Similarity score (Levenshtein distance)
  const similarity = calculateSimilarity(normalizedQuery, normalizedText);
  if (similarity > 0.6) {
    return similarity * 0.6; // Max 0.6 for partial matches
  }

  return 0;
}

// Kiểm tra xem text có chứa các ký tự từ query không
function partialMatch(query, text) {
  const normalizedQuery = removeVietnameseDiacritics(query).toLowerCase();
  const normalizedText = removeVietnameseDiacritics(text).toLowerCase();

  let queryIndex = 0;
  for (let i = 0; i < normalizedText.length && queryIndex < normalizedQuery.length; i++) {
    if (normalizedText[i] === normalizedQuery[queryIndex]) {
      queryIndex++;
    }
  }
  
  return queryIndex === normalizedQuery.length ? 0.5 : 0;
}

module.exports = {
  fuzzySearch,
  partialMatch,
  removeVietnameseDiacritics,
  calculateSimilarity,
  levenshteinDistance
};
