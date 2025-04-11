const toNumber = (val: string | number | null) => {
    if (!val) return null;
    return !isNaN(Number(val)) ? Number(val) : null;
  };
  
  export { toNumber };