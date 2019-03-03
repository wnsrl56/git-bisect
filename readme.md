how to check bug with git

## git bisect 사용법

> git bisect start [hash-start|tag-name] [hash-end|tag-name]

#### example
> git bisect start v1.0 dev


이후에는 bisect 대화형 인터페이스로 들어가게 됩니다.

탈출하고 싶으면 

> git bisect reset

이후에는 bisect가 순차적으로 head 를 hash end 쪽으로 변경하면서 진행하게 됩니다.

이 예제는 mockup.json의 파일 삭제 커밋을 찾는게 목적이기 때문에 찾아봅니다

> cat mockup.json 

만약 비었으면 

> git bisect bad // 다음 커밋으로 이동됨

만약 찾았으면

> git bisect good 
 
이후에, commit hash 체크 후, git bisect reset으로 원복

해당 방식은 몇 개 없는 커밋내 에서는 찾기가 쉬우나 만약 빌드가 엮이거나 할때는 체크하기 가 어렵기 때문에 git에서는 자동 스크립트를 수행하는 걸 권장합니다.

>git bisect run [script file name]

내재된 스크립트는 mockup file이 empty인지 체크하는 스크립트입니다.

수행 후 바로 good / bad를 실행하여, 최종 commit 위치를 찾아내는 것을 확인 할 수 있습니다.