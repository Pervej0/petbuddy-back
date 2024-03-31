const paginationCalculation = (options: Record<string, unknown>) => {
  const page = Number(options.page) | 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
};

export default paginationCalculation;
