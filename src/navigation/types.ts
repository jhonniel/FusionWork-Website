export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Services: undefined;
  Portfolio: undefined;
  Contact: undefined;
  BlogPost: { postId: string };
};

export type RootRouteName = keyof RootStackParamList;

/** Top-level screens linked from the navbar and footer (excludes article detail). */
export type MainRouteName = Exclude<RootRouteName, 'BlogPost'>;
