function onRowAdd(newData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      {
        const data = this.state.data;
        data.push(newData);
        this.setState({ data }, () => resolve());
      }
      resolve();
    }, 1000);
  });
}
