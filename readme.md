how to check bug with git

## git bisect 사용법

**주의: 현재 브런치가 깨끗한 상황에서 진행이 되어야 합니다**

```bash
    $git bisect start [hash start|tag name] [hash end|tag name]
```

#### example
```bash
    $git bisect start v1.0 dev
```
이후에는 bisect 대화형 인터페이스로 들어가게 됩니다.

탈출하고 싶으면 
```bash
    $git bisect reset
```
이후에는 bisect가 순차적으로 head 를 hash end 쪽으로 변경하면서 진행하게 됩니다.

이 예제는 mockup.json의 파일내용을 삭제한 커밋을 찾는 게 목적이기 때문에 찾아봅니다
```bash
    $cat mockup.json
```

만약 비었으면 

```bash
    $git bisect bad
```
다음 커밋으로 이동합니다.

만약 찾았으면
```bash
    $git bisect good
``` 
이후에, commit hash 체크 후, git bisect reset으로 원복

```bash
    $git bisect reset
``` 

해당 방식은 몇 개 없는 커밋내 에서는 찾기가 쉬우나 만약 빌드가 엮이거나 할때는 체크하기 가 어렵기 때문에 git에서는 자동 스크립트를 수행하는 걸 권장합니다.

### **주의 사항**
```
내재되어있는 스크립트는 git 폴더 영향을 받지 않도록 외부로 빼내서 실행해야됩니다. 또 폴더 위치 변경 시, 상대 경로 의존성 등을 수정해주세요
```

```bash
    $git bisect start [hash start|tag name] [hash end|tag name]
    $git bisect run [runtime] [script file name]
``` 

#### example
```bash
    $git bisect start v1.0 dev
    $git bisect run node ../bisect_check_mockup.json
``` 

내재된 스크립트는 mockup file이 empty인지 체크하는 스크립트입니다.
수행 후 바로 good / bad를 실행하여, 최종 commit 위치를 찾아내는 것을 확인 할 수 있습니다.

#### 실행 결과
```bash
:100644 100644 5f7ab3a002a9fe9e44bec5c6052a00bfdadf2819 e69de29bb2d1d6434b8b29ae775ad8c2e48c5391 M      mockup.json
bisect run success
```
```bash
    $git show
```
다음 명령어를 통해서 해당 커밋 내역을 확인 할 수 있습니다. 확인 후에는
```bash
    $git bisect reset
``` 
다시 head로 복구를 하면 됩니다.

### 결론
해당 로직을 통해서, 에러가 발생한 지점까지의 범위를 빠르게 좁힐 수 있고
또 사람이 일일히 체크하는게 아닌 자동화를 진행할 수 있어 더욱 간결한 업무가 가능합니다.


