# Random chat App backend

Express와 Socket.IO를 사용해 구현한 랜덤 채팅 Backend 어플리케이션입니다.

## Features

- Login
- Connect peer
- Disconnect Peer
- Create Room
- Leave Room
- Send / Receive Message

## Skills

- Express
- socket.io

## Install

**Install**
using yarn: `yarn install`
Or npm: `npm install`

**Execute**
using yarn: `yarn start`
Or npm: `npm start`

### 테스트 후기

Socket.IO의 양방향 특성을 이해하는데 많은 시간이 들었다. 전에 했던 백엔드는 요청과 응답의 구조가 단순했던 반면 이번 과제는 좀더 다이나믹하게 주고 받아야 했기 때문에 프론트와 백엔드를 왔다 갔다 작업하며 비효율적으로 일하게 되었다. 가장 힘들었던 점은 영어 문서에서 내가 원하는 정보를 찾는 일이었다. 모두 읽기에는 시간이 부족했고 설렁 설렁 읽기에는 구현해야 하는 것들이 깊은 이해를 요구했다.

이번 기회에 Socket을 활용해서 어플리케이션을 구현해봤지만 내가 사용한 기술보다 훨씬 더 많은 기능이 있다는 것을 안다. 다음에 기회가 된다면 소켓을 활용해 더 재밌는 것들을 만들 수 있겠다는 생각이 든다.

현재 백엔드 테스트는 없습니다. 로직이 모두 Socket 이벤트 핸들러이기 때문에 (물론 찾아보니 테스팅하는 방법은 있지만..) 하지 못했습니다. 대신 프론트엔드단의 테스트에 집중해서 이전 테스트 때보다 더 꼼꼼하게 했다고 생각합니다.
