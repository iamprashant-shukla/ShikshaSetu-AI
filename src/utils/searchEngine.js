import policiesData from '../data/policies.json';

export class SmartSearchEngine {
  constructor() {
    this.policies = policiesData;
    this.searchIndex = this.buildSearchIndex();
  }

  // Build search index for faster searching
  buildSearchIndex() {
    const index = {};
    
    this.policies.forEach(policy => {
      const searchableText = [
        policy.name,
        policy.category,
        policy.description,
        policy.implementingAgency,
        ...policy.search_keywords,
        ...policy.achievements,
        ...policy.challenges
      ].join(' ').toLowerCase();
      
      index[policy.id] = searchableText;
    });
    
    return index;
  }

  // Smart search with multiple strategies
  search(query, filters = {}) {
    if (!query.trim()) {
      return this.applyFilters(this.policies, filters);
    }

    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);
    const results = [];

    this.policies.forEach(policy => {
      let score = 0;
      const searchText = this.searchIndex[policy.id];

      // Exact name match (highest priority)
      if (policy.name.toLowerCase().includes(query.toLowerCase())) {
        score += 100;
      }

      // Category match
      if (policy.category.toLowerCase().includes(query.toLowerCase())) {
        score += 80;
      }

      // Keyword matches
      searchTerms.forEach(term => {
        if (policy.search_keywords.some(keyword => keyword.includes(term))) {
          score += 60;
        }
        
        // General text search
        if (searchText.includes(term)) {
          score += 20;
        }
      });

      // Budget range queries
      if (query.includes('budget') || query.includes('crore')) {
        score += 30;
      }

      // Beneficiary queries
      if (query.includes('student') || query.includes('beneficiar')) {
        score += 25;
      }

      if (score > 0) {
        results.push({ ...policy, searchScore: score });
      }
    });

    // Sort by relevance score
    const sortedResults = results.sort((a, b) => b.searchScore - a.searchScore);
    
    return this.applyFilters(sortedResults, filters);
  }

  // Apply filters to results
  applyFilters(results, filters) {
    let filtered = [...results];

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(policy => policy.category === filters.category);
    }

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(policy => policy.status === filters.status);
    }

    if (filters.budgetRange) {
      const [min, max] = filters.budgetRange;
      filtered = filtered.filter(policy => policy.budget >= min && policy.budget <= max);
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'budget_desc':
          filtered.sort((a, b) => b.budget - a.budget);
          break;
        case 'budget_asc':
          filtered.sort((a, b) => a.budget - b.budget);
          break;
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'relevance':
        default:
          // Already sorted by search score
          break;
      }
    }

    return filtered;
  }

  // Get suggestions based on partial query
  getSuggestions(query) {
    if (!query || query.length < 2) {
      return ['PM SHRI Schools', 'Samagra Shiksha', 'Digital Education', 'Scholarship Programs'];
    }

    const suggestions = [];
    const lowercaseQuery = query.toLowerCase();

    // Add scheme names that match
    this.policies.forEach(policy => {
      if (policy.name.toLowerCase().includes(lowercaseQuery)) {
        suggestions.push(policy.name);
      }
    });

    // Add categories that match
    const categories = [...new Set(this.policies.map(p => p.category))];
    categories.forEach(category => {
      if (category.toLowerCase().includes(lowercaseQuery)) {
        suggestions.push(category);
      }
    });

    // Add common search terms
    const commonTerms = [
      'budget analysis', 'beneficiaries', 'implementation status', 
      'achievements', 'challenges', 'future goals'
    ];
    
    commonTerms.forEach(term => {
      if (term.includes(lowercaseQuery)) {
        suggestions.push(term);
      }
    });

    return suggestions.slice(0, 5);
  }

  // Get policy by ID
  getPolicyById(id) {
    return this.policies.find(policy => policy.id === parseInt(id));
  }

  // Get all categories
  getCategories() {
    return [...new Set(this.policies.map(policy => policy.category))];
  }

  // Get budget statistics
  getBudgetStats() {
    const budgets = this.policies.map(p => p.budget);
    return {
      total: budgets.reduce((sum, budget) => sum + budget, 0),
      average: budgets.reduce((sum, budget) => sum + budget, 0) / budgets.length,
      max: Math.max(...budgets),
      min: Math.min(...budgets)
    };
  }
}

// Create singleton instance
export const searchEngine = new SmartSearchEngine();
