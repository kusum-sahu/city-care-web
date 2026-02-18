const BackToTop = () => {
  return (
    <button
      className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      ↑
    </button>
  )
}

export default BackToTop
