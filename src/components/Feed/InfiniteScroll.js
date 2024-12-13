import React, { Component, createRef } from "react";

class InfiniteScroll extends Component {
  state = {
    isLoading: false,
  };

  observer = null;
  loaderRef = createRef();

  componentDidMount() {
    this.initializeObserver();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.hasMore !== this.props.hasMore) {
      // Re-initialize observer if `hasMore` changes
      this.initializeObserver();
    }
  }

  componentWillUnmount() {
    // Cleanup observer on unmount
    if (this.observer) this.observer.disconnect();
  }

  initializeObserver = () => {
    const { hasMore } = this.props;

    if (!hasMore) {
      // Disconnect observer if no more items
      if (this.observer) this.observer.disconnect();
      return;
    }

    const handleObserver = (entries) => {
      const [entry] = entries;

      if (entry.isIntersecting && !this.state.isLoading) {
        this.fetchMore();
      }
    };

    // Cleanup existing observer before creating a new one
    if (this.observer) this.observer.disconnect();

    this.observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });

    if (this.loaderRef.current) {
      this.observer.observe(this.loaderRef.current);
    }
  };

  fetchMore = () => {
    const { fetchMorePosts, hasMore } = this.props;

    if (hasMore && !this.state.isLoading) {
      this.setState({ isLoading: true }, () => {
        fetchMorePosts().finally(() => {
          this.setState({ isLoading: false });
        });
      });
    }
  };

  render() {
    const { children, hasMore } = this.props;
    const { isLoading } = this.state;

    return (
      <div>
        {children}
        {hasMore && <div ref={this.loaderRef} style={{ height: "50px" }} />}
        {isLoading && (
          <div className="loader" style={{ textAlign: "center", margin: "20px 0" }}>
            Loading more posts...
          </div>
        )}
      </div>
    );
  }
}

export default InfiniteScroll;
