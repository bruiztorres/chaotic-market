import { Container, interfaces } from 'inversify';
import React, { HTMLProps, useContext } from 'react';

type IocProviderProps = HTMLProps<HTMLDivElement> & { container: Container };

const IocContext = React.createContext<{ container: Container | null }>({ container: null });

export function IocProvider({ container, children }: IocProviderProps): JSX.Element {
  return (
    <IocContext.Provider value={{ container }}>
      { children }
    </IocContext.Provider>
  );
}

export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>): T {
  const { container } = useContext(IocContext);

  if (!container) {
    throw new Error('Unregistered IoC container!');
  }

  return container.get<T>(identifier);
}
