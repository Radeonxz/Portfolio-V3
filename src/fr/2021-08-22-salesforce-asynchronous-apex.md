---
layout: layouts/article
masterTitle: Salesforce Asynchronous Apex
isPublished: true
isFeatured: true
isMachineTranslated: true
title: Apex asynchrone de Salesforce
description: Meilleure pratique de l'apex asynchrone dans Salesforce.
date: 2021-08-22T06:16:32.741Z
image: /assets/content/salesforce.png
imageAlt: Salesforce img
---

## Utiliser Apex Asynchrone

## Quand choisir l'asynchrone

Les trois raisons suivantes sont généralement à l'origine du choix de la programmation asynchrone.

1. **Traitement d'un très grand nombre d'enregistrements**. Cette raison est unique au monde multi-tenant de la plateforme Lightning, où les limites sont la règle. Les limites associées aux processus asynchrones sont plus élevées que celles des processus synchrones. Par conséquent, si vous devez traiter des milliers, voire des millions d'enregistrements, le traitement asynchrone est votre meilleure option.

2. **Faire des appels à des services Web externes**. Les appels peuvent prendre beaucoup de temps à traiter, mais dans la plateforme Lightning, les déclencheurs ne peuvent pas effectuer d'appels directement.

3. **Créer une expérience utilisateur meilleure et plus rapide** en déchargeant certains traitements vers des appels asynchrones. Pourquoi tout faire en même temps ? Si cela peut attendre, laissez-le faire.

## Méthodes futures

Dans les situations où vous devez faire un appel à un service Web ou souhaitez décharger un traitement simple vers une tâche asynchrone, la création d'une méthode future peut être la solution.

Il est très facile de faire passer une méthode d'un traitement synchrone à un traitement asynchrone. Pour l'essentiel, il suffit d'ajouter l'annotation @future à votre méthode. À part cela, assurez-vous que la méthode est statique et qu'elle renvoie uniquement un type void. Par exemple, pour créer une méthode permettant d'effectuer un appel de service Web, nous pourrions faire quelque chose comme ceci:

```
public class MyFutureClass {
    // Include callout=true when making callouts
    @future(callout=true)
    static void myFutureMethod(Set<Id> ids) {
        // Get the list of contacts in the future method since
        // you cannot pass objects as arguments to future methods
        List<Contact> contacts = [SELECT Id, LastName, FirstName, Email
            FROM Contact WHERE Id IN :ids];
        // Loop through the results and call a method
        // which contains the code to do the actual callout
        for (Contact con: contacts) {
            String response = anotherClass.calloutMethod(con.Id,
                con.FirstName,
                con.LastName,
                con.Email);
            // May want to add some code here to log
            // the response to a custom object
        }
    }
}
```

### Limites du futur

Voici quelques limitations à prendre en compte avant d'utiliser une méthode future.

- Vous ne pouvez pas suivre l'exécution car aucun **ID de travail Apex** n'est renvoyé.
- Les paramètres doivent être des **types de données primitifs**, des tableaux de types de données primitifs ou des collections de types de données primitifs. Les méthodes futures **ne peuvent pas prendre d'objets comme arguments**.
- Vous ne pouvez pas enchaîner les méthodes futures et faire en sorte qu'une méthode appelle une autre.

## Apex par lot ou programmé

Un autre outil asynchrone utilisé depuis longtemps est l'interface **batchable**. La première raison de l'utiliser est que vous devez traiter un grand nombre d'enregistrements. Par exemple, si vous voulez nettoyer ou archiver **jusqu'à 50 millions d'enregistrements**, l'interface batchable est votre réponse. Vous pouvez même programmer l'exécution de vos lots à un moment précis.

Pour l'utiliser, votre classe implémente l'interface **Database.Batchable**. Vous définissez également les méthodes **start()**, **execute()** et **finish()**. Vous pouvez ensuite invoquer une classe batch à l'aide de la méthode **Database.executeBatch**. Par exemple, le code suivant crée une classe batchable qui traite tous les comptes d'une organisation et envoie un courriel lorsque cela est fait.

```
global class MyBatchableClass implements
            Database.Batchable<sObject>,
            Database.Stateful {
    // Used to record the total number of Accounts processed
    global Integer numOfRecs = 0;
    // Used to gather the records that will be passed to the interface method
    // This method will only be called once and will return either a
    // Database.QueryLocator object or an Iterable that contains the records
    // or objects passed to the job.
    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator('SELECT Id, Name FROM Account');
    }
    // This is where the actual processing occurs as data is chunked into
    // batches and the default batch size is 200.
    global void execute(Database.BatchableContext bc, List<Account> scope) {
        for (Account acc : scope) {
            // Do some processing here
            // and then increment the counter variable
            numOfRecs = numOfRecs + 1;
        }
    }
    // Used to execute any post-processing that may need to happen. This
    // is called only once and after all the batches have finished.
    global void finish(Database.BatchableContext bc) {
        EmailManager.sendMail('someAddress@somewhere.com',
                              numOfRecs + ' Accounts were processed!',
                              'Meet me at the bar for drinks to celebrate');
    }
}
```

Vous pourriez alors invoquer la classe batch en utilisant un code anonyme tel que celui-ci:

```
MyBatchableClass myBatchObject = new MyBatchableClass();
Database.executeBatch(myBatchObject);
```

### Limites de Batchable

L'interface batchable est formidable, mais comme pour tout, il faut tenir compte de ses limites.

- Le dépannage peut être difficile.
- Les travaux sont mis en file d'attente et soumis à la disponibilité du serveur, ce qui peut parfois prendre plus de temps que prévu.

## Et puis il y a eu Queueable Apex

Queueable Apex offre les avantages suivants aux méthodes futures.

- **Types non primitifs** - Les classes peuvent accepter des variables paramètres de types de données non primitifs, tels que sObjects ou des types Apex personnalisés.
- Suivi\*\* - Lorsque vous soumettez votre travail, un jobId est renvoyé et vous pouvez l'utiliser pour identifier le travail et suivre sa progression.
- Chaînage de tâches\*\* - Vous pouvez enchaîner une tâche à une autre en démarrant une deuxième tâche à partir d'une tâche en cours d'exécution. Le chaînage de tâches est utile pour le traitement séquentiel.

Parce que **Queueable Apex** inclut le meilleur des méthodes futures, il est beaucoup plus facile à mettre en œuvre que Batch Apex. Il n'a simplement pas ces limitations ennuyeuses dont nous avons parlé. Pour montrer comment cela fonctionne, prenons l'exemple de code qui utilise une méthode future pour faire un appel Web et mettons-le en œuvre en utilisant Queueable Apex.

```
public class MyQueueableClass implements Queueable {
    private List<Contact> contacts;
    // Constructor for the class, where we pass
    // in the list of contacts that we want to process
    public MyQueueableClass(List<Contact> myContacts) {
        contacts = myContacts;
    }
    public void execute(QueueableContext context) {
        // Loop through the contacts passed in through
        // the constructor and call a method
        // which contains the code to do the actual callout
        for (Contact con: contacts) {
            String response = anotherClass.calloutMethod(con.Id,
                    con.FirstName,
                    con.LastName,
                    con.Email);
            // May still want to add some code here to log
            // the response to a custom object
        }
    }
}
```

Pour invoquer Queueable Apex, vous avez besoin de quelque chose comme ce qui suit:

```
List<Contact> contacts = [SELECT Id, LastName, FirstName, Email
    FROM Contact WHERE Is_Active__c = true];
Id jobId = System.enqueueJob(new MyQueueableClass(contacts));
```
