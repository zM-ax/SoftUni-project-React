const TestimonialList = () => {
  const test = [{ a: 1 }, { a: 2 }, { a: 3 }];
  return (
    <div>
      <ul>
        {test.map((x) => (
          <li>{x.a}</li>
        ))}
      </ul>
    </div>
  );
};

export default TestimonialList;
